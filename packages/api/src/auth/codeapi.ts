/**
 * Auth headers for direct LibreChat -> code-execution-server requests
 * (upload, batch upload, download, session info, sandbox `cat`/exec).
 *
 * The `execute_code` / `bash_tool` calls authenticate inside
 * `@librechat/agents` via the sandbox env. These direct axios calls do not
 * go through that path, so a self-hosted code server (e.g. KubeCodeRun)
 * that requires `x-api-key` rejects them with 401 unless the consumer key
 * is attached here. `LIBRECHAT_CODE_API_KEY` is the same value the code
 * server checks against; an empty/whitespace value is treated as unset.
 */
export function getCodeApiAuthHeaders(): Record<string, string> {
  const apiKey = process.env.LIBRECHAT_CODE_API_KEY?.trim();
  if (apiKey) {
    return { 'x-api-key': apiKey };
  }
  return {};
}
