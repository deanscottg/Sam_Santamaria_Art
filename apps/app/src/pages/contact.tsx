import ContactForm from "../../components/ContactForm";
import { nextSanityClient } from "../../lib/client";
import { Painting, Photo } from "../../types/types";
import { useRouter } from "next/router";

interface ContactProps {
	artworks: Array<{ id: string; name: string; type: string }>;
}

const Contact = ({ artworks }: ContactProps) => {
  const router = useRouter();
  const preselectedArtwork = router.query.artwork as string | undefined;
  return (
    <div className="page-container min-h-screen">
      <ContactForm artworks={artworks} preselectedArtwork={preselectedArtwork} />
    </div>
  );
};

export async function getStaticProps() {
    // Fetch all paintings
    const paintings = await nextSanityClient.fetch(`
        *[_type == "painting"] {
            _id,
            name
        }
    `);
    // Fetch all photographs
    const photographs = await nextSanityClient.fetch(`
        *[_type == "photograph"] {
            _id,
            name
        }
    `);

    const artworks = [
      ...paintings.map((p: any) => ({ id: p._id, name: p.name, type: "Painting" })),
      ...photographs.map((p: any) => ({ id: p._id, name: p.name, type: "Photograph" })),
    ].sort((a, b) => a.name.localeCompare(b.name));
    // Return the artworks as props
    return {
        props: { artworks },
        revalidate: 3600, // Revalidate every hour
    };
}

export default Contact;
