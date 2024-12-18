/**
 * Google DriveのURLからファイルIDを抽出する
 */
export function extractGoogleDriveFileId(url: string): string | null {
  // Google DriveのURLからファイルIDを抽出する正規表現
  const fileIdRegex = /\/d\/(.*?)\/view/;
  const match = url.match(fileIdRegex);
  return match ? match[1] : null;
}

/**
 * Google DriveのURLを直接表示可能な画像URLに変換する
 */
export function getGoogleDriveImageUrl(url: string): string {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return '';
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}