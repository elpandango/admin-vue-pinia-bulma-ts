export const getCookie = (name: string) => {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");

    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

export const setCookie = (name: string, value: string, cookieDomain: string | null, days: number = 30) => {
  const assign = name + "=" + value + ";";
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString() + ";";
  const path = "path=/;";
  const domain = "domain=" + import.meta.env.VITE_APP_COOKIE_DOMAIN + ";";
  document.cookie = assign + expires + path + domain;
}

export const deleteCookie = (cName: string) => {
  document.cookie = `${cName}=; Max-Age=0; path=/; domain=${import.meta.env.VITE_APP_COOKIE_DOMAIN}`;
}
