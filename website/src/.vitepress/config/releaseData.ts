import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Octokit } from '@octokit/rest'

const cacheFile = resolve(dirname(fileURLToPath(import.meta.url)), '../../../.cache/github-releases.json')
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export type Release = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.getLatestRelease>

export interface ReleaseData {
  stable: Release[]
  stableLatest: Release
  betaLatest: Release
}

interface CachedReleaseData extends ReleaseData {
  version: 1
  fetchedAt: string
}

// Release info for the APK shipped in this repo (shio.apk). Update version + date when replacing the APK.
const STUB_RELEASE: Release = {
  tag_name: 'v1.0.0',
  name: 'Shio v1.0.0',
  published_at: '2026-11-07T19:41:00Z',
  created_at: '2026-11-07T19:41:00Z',
  assets: [
    {
      name: 'shio.apk',
      browser_download_url: 'https://github.com/Niskly/ShioApp/raw/main/shio.apk',
    } as any,
  ],
} as unknown as Release

const STUB_DATA: ReleaseData = {
  stable: [STUB_RELEASE],
  stableLatest: STUB_RELEASE,
  betaLatest: STUB_RELEASE,
}

let releaseDataPromise: Promise<ReleaseData> | undefined

export async function getReleaseData(): Promise<ReleaseData> {
  releaseDataPromise ||= loadReleaseData()
  return releaseDataPromise
}

export async function refreshReleaseData(): Promise<ReleaseData> {
  releaseDataPromise = fetchReleaseData()
  const data = await releaseDataPromise
  await writeCache(data)
  return data
}

export async function getStableReleases(): Promise<Release[]> {
  return (await getReleaseData()).stable
}

export async function getStableRelease(tag: string): Promise<Release | undefined> {
  return (await getReleaseData()).stable.find(release => release.tag_name === tag)
}

async function loadReleaseData(): Promise<ReleaseData> {
  return STUB_DATA
}

async function fetchReleaseData(): Promise<ReleaseData> {
  const [stable, stableLatest, betaLatest] = await Promise.all([
    octokit.paginate(octokit.repos.listReleases, {
      owner: 'Niskly',
      repo: 'ShioApp',
      per_page: 100,
    }),
    octokit.repos.getLatestRelease({ owner: 'Niskly', repo: 'ShioApp' }),
    octokit.repos.getLatestRelease({ owner: 'Niskly', repo: 'ShioApp' }),
  ])

  return {
    stable,
    stableLatest: stableLatest.data,
    betaLatest: betaLatest.data,
  }
}

async function readCache(): Promise<ReleaseData | undefined> {
  try {
    const cached = JSON.parse(await readFile(cacheFile, 'utf8')) as Partial<CachedReleaseData>
    if (cached.version === 1 && Array.isArray(cached.stable) && cached.stableLatest && cached.betaLatest) {
      return {
        stable: cached.stable,
        stableLatest: cached.stableLatest,
        betaLatest: cached.betaLatest,
      }
    }
  }
  catch {
    // Cache missing or outdated — will use stub or fetch
  }
}

async function writeCache(data: ReleaseData): Promise<void> {
  await mkdir(dirname(cacheFile), { recursive: true })
  const temporaryFile = `${cacheFile}.tmp`
  const cached: CachedReleaseData = {
    version: 1,
    fetchedAt: new Date().toISOString(),
    ...data,
  }
  await writeFile(temporaryFile, `${JSON.stringify(cached, null, 2)}\n`)
  await rename(temporaryFile, cacheFile)
}

async function main(): Promise<void> {
  const data = await refreshReleaseData()
  console.warn(`Cached ${data.stable.length} stable releases in ${cacheFile}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  void main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
