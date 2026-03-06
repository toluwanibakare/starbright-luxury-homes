import { listings } from "@/data/mockData";

export default async function Head({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const listing = listings.find((item) => item.slug === slug);

    if (!listing) {
        return (
            <>
                <title>Property Not Found | Starbright Luxury Homes</title>
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </>
        );
    }

    return (
        <>
            <title>{`${listing.title} | Starbright Luxury Homes`}</title>
            <meta name="description" content={listing.description} />
            <meta
                name="keywords"
                content={`${listing.title}, ${listing.location}, ${listing.category} for sale, verified property Lagos`}
            />
            <link rel="canonical" href={`/listings/${listing.slug}`} />
        </>
    );
}
