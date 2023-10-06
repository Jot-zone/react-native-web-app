export function changeSubdomain(subdomain: string) {
  const hostname = window.location.hostname;
  const currentSubdomain = hostname.split('.')[0];
  const domain = currentSubdomain === 'jot' ? hostname : hostname.split('.').slice(1).join('.');
  window.location.hostname = `${subdomain}.${domain}`;
}

export function goToAppDashboard() {
    changeSubdomain('app');
}