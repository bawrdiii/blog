export default async function API(address, option) {
  const url = `https://jsonplaceholder.typicode.com/${address}`;

  const response = await fetch(url, option);

  const data = await response.json();

  const status = response.status;

  return { status, data };
}
