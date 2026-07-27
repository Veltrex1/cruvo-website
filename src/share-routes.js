import { MapPinned, Newspaper, UserRound } from 'lucide-react';

const SHARE_ROUTES = [
  {
    description: 'Open the invitation in Cruvo to view the route, meet-up details, and join the ride.',
    icon: MapPinned,
    kind: 'ride',
    pattern: /^\/rides\/([^/]+)$/,
    title: 'You have been invited to ride.',
  },
  {
    description: 'Open Cruvo to view this crew post, its media, comments, and attached route.',
    icon: Newspaper,
    kind: 'post',
    pattern: /^\/posts\/([^/]+)$/,
    title: 'A rider shared a crew post.',
  },
  {
    description: 'Open Cruvo to view this rider profile, garage, posts, and shared routes.',
    icon: UserRound,
    kind: 'profile',
    pattern: /^\/(?:u|users)\/([^/]+)$/,
    title: 'Meet this rider on Cruvo.',
  },
];

export function getShareRoute(pathname) {
  for (const route of SHARE_ROUTES) {
    const match = pathname.match(route.pattern);
    if (match) {
      try {
        return { ...route, value: decodeURIComponent(match[1]) };
      } catch {
        return null;
      }
    }
  }
  return null;
}
