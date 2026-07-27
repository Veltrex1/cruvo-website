/* global process */

const PACKAGE_NAME = 'com.veltrex1.cruvo';

function getFingerprints() {
  return (
    process.env.ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINTS
    ?? process.env.ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINT
    ?? ''
  )
    .split(',')
    .map((fingerprint) => fingerprint.trim().toUpperCase())
    .filter((fingerprint) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(fingerprint));
}

export default function handler(_request, response) {
  const fingerprints = getFingerprints();
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');

  if (!fingerprints.length) {
    response.status(503).json({
      error: 'ANDROID_APP_LINKS_SHA256_CERT_FINGERPRINTS is not configured',
    });
    return;
  }

  response.status(200).json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: PACKAGE_NAME,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ]);
}
