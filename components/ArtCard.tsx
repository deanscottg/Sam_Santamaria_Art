import Image from "next/image";
const ArtCard = () => {
    return (
        <div className="container">
                <h1>Painting name</h1>
                <Image alt="squidward" src="/squidward.jpg"/>
                <p>
                    This is all the info about this painting
                </p>

                
        </div>
    );
}
 
export default ArtCard;