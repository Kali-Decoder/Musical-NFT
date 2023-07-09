import { NFTStorage } from "nft.storage";

const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyRTU5N2E5NDIxRTFjNTg5QmI1Qjk3MjkxMjM4NEM2NjUyMzAwQ0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODMzMzMzODQwNiwibmFtZSI6Ik5GVC1HYXNsZXNzIn0._DMykZ4nlmIluv-azS6Qx6aOQIY9yDHAO3DGQcgZ-uU";

export const mintNFT = async (collectionName, description, banner , singers_name,production,song_name,audio,lyrics,original_composition) => {
  // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  const nft = {
    image: banner, // use image Blob as `image` field
    name:collectionName,
    description,
    properties: {
      song_name,
      singers_name,
      original_composition,
      lyrics,
      production,
      audio
    },
   
  };

  const metadata = await client.store(nft);

  // the returned metadata.url has the IPFS URI we want to add.
  // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
  // const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  return metadata.url;
};
