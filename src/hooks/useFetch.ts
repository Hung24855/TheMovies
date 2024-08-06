

export default async function usefetch<T>(
  url: string,
) {
  try {
    const baseUrl = process.env.BASE_URL_API;
    const fullUrl = url.startsWith("/")
      ? `${baseUrl}${url}`
      : `${baseUrl}/${url}`;

    const response = await fetch(fullUrl,{next:{revalidate:60}}).then((res) => res.json());
    const data = response.data as T;
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
}
