const association = {
  applinks: {
    details: [
      {
        appIDs: ['J5K3L626BS.com.veltrex1.cruvo'],
        components: [
          { '/': '/rides/*', comment: 'Cruvo ride invitations' },
          { '/': '/posts/*', comment: 'Cruvo crew posts' },
          { '/': '/u/*', comment: 'Cruvo username profiles' },
          { '/': '/users/*', comment: 'Cruvo user profiles' },
        ],
      },
    ],
  },
  activitycontinuation: {
    apps: ['J5K3L626BS.com.veltrex1.cruvo'],
  },
  webcredentials: {
    apps: ['J5K3L626BS.com.veltrex1.cruvo'],
  },
};

export default function handler(_request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
  response.status(200).json(association);
}
