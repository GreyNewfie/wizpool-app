export default function addBasePath(path) {
  const basePath = '/wizpool-app/';
  let filePath = path;

  if (filePath.startsWith('/')) {
    filePath = filePath.substring(1);
  }

  return `${basePath}${filePath}`;
}
