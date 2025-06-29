import { api } from "~/trpc/server";
import { ClientDetails } from "~/features/client-details";
import type { SlugParams } from "~/shared/types/slug-param";

interface Props {
  params: Promise<SlugParams>;
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const client = await api.clients.getOne({ slug });

  return <ClientDetails client={client} />;
}
