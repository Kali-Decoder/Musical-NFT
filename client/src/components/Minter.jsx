import React, { useState, useRef } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import { mintNFT } from "../utils/nft-storage";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../utils/contract-constants";
import { useSigner, useAccount } from "wagmi";
const Minter = () => {
  const [formData, setFormData] = useState({
    collectionName: "",
    song_name: "",
    singers_name: "",
    original_composition: "",
    production: "",
    lyrics: "",
  });

  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const toastId = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleAudio = (e) => {
    const file = e.target.files[0];

    setAudioFile(file);
  };
  const getInstance = async () => {
    try {
      console.log(signer, address);
      let instance = await new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      return instance;
    } catch (error) {
      console.log(error);
    }
  };
  const onClickSubmit = async () => {
    try {
      if (
        formData.collectionName &&
        formData.lyrics &&
        formData.song_name &&
        formData.singers_name &&
        formData.production &&
        image &&
        audioFile
      ) {
        toastId.current = toast("⏳ Meta Data is Uploading", {
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
        let metadataURI = await mintNFT(
          formData.collectionName,
          "NFT that reflects ownership or serves as proof of authenticity for a piece of music or musical composition is referred to as a musical NFT",
          image,
          formData.singers_name,
          formData.production,
          formData.song_name,
          audioFile,
          formData.lyrics,
          formData.original_composition
        );

        if (metadataURI) {
          toast.success("Metadata Uploaded Successfully", {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
          });
          toast.update(toastId.current, {
            render: "🦄 Metadata is Uploaded, Minting the Musical NFT",
            type: toast.TYPE.INFO,
            theme: "dark",
            autoClose: 5000,
            closeButton: true,
          });
          let contractInstance = await getInstance();
          await contractInstance.mintNFT(address, metadataURI);
          toast.update(toastId.current, {
            render: "🦄 Minted Successfully !!!",
            type: toast.TYPE.INFO,
            theme: "dark",
            autoClose: 5000,
            closeButton: true,
          });
        }
      } else {
        toast.error("Error in Inputs !", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      toast.error("Mint Rejected !", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.log(error);
    }
  };
  return (
    <>
      {address ? (
        <div className="max-w-screen-md mx-auto p-5 px-10 border mt-10">
          <div className="text-center mt-10 mb-10">
            <h3 className="text-3xl flex items-center justify-center sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-500">
              Mint Musical{" "}
              <span className="text-indigo-600 flex">
                <GiMusicalNotes size={30} className="mx-2 mr-2" /> NFT
              </span>
            </h3>
          </div>

          <div className="w-full md:w-1/1 mb-6">
            <label className="block uppercase  tracking-wide text-indigo-400 text-xs font-bold mb-2">
              Collection Name
            </label>
            <input
              className="appearance-none block w-full placeholder:text-gray-700  text-white  bg-black border border-white py-3 px-4 mb-3 leading-tight focus:outline-none "
              type="text"
              placeholder="Album"
              onChange={(e) => onChangeInput(e)}
              name="collectionName"
              value={formData.collectionName}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-indigo-400 text-xs font-bold mb-2">
                Song Name
              </label>
              <input
                className="appearance-none block w-full placeholder:text-gray-700  text-white  bg-black border border-white py-3 px-4 mb-3 leading-tight focus:outline-none "
                type="text"
                placeholder="Tum Hi Ho"
                onChange={(e) => onChangeInput(e)}
                name="song_name"
                value={formData.song_name}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-indigo-400 text-xs font-bold mb-2">
                Singers Name
              </label>
              <input
                className="appearance-none block w-full placeholder:text-gray-700 bg-black border border-white  text-white  py-3 px-4 leading-tight focus:outline-none"
                type="text"
                placeholder="Arjit"
                onChange={(e) => onChangeInput(e)}
                name="singers_name"
                value={formData.singers_name}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-indigo-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Original Composition
              </label>
              <input
                className="appearance-none block w-full placeholder:text-gray-700 bg-black  border-white  text-white border  py-3 px-4 mb-3 leading-tight focus:outline-none "
                type="text"
                placeholder="KRK"
                onChange={(e) => onChangeInput(e)}
                name="original_composition"
                value={formData.original_composition}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-indigo-400 text-xs font-bold mb-2">
                Music Production
              </label>
              <input
                className="appearance-none block w-full  placeholder:text-gray-700 text-white  bg-black border border-white  py-3 px-4 leading-tight focus:outline-none"
                type="text"
                placeholder="Dharma Production"
                onChange={(e) => onChangeInput(e)}
                name="production"
                value={formData.production}
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file1"
                class="flex flex-col items-center justify-center w-3/4 h-30 border-2 border-indigo-400 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800   dark:hover:border-gray-500 "
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">
                      Click to upload Banner of Music{" "}
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file1"
                  name="banner"
                  type="file"
                  class="hidden"
                  onChange={handleImageChange}
                  accept=".jpeg,.jpg,.png,.gif"
                />
              </label>
            </div>

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file2"
                class="flex flex-col items-center justify-center w-3/4 h-30 border-2 border-indigo-400 border-dashed rounded-lg cursor-pointer"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to Upload Music</span>
                  </p>
                </div>
                <input
                  id="dropzone-file2"
                  name="audio"
                  accept="audio/mp3"
                  type="file"
                  class="hidden"
                  onChange={handleAudio}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-indigo-400 text-xs font-bold mb-2"
                for="grid-password"
              >
                Lyrics
              </label>
              <textarea
                rows="10"
                onChange={(e) => onChangeInput(e)}
                name="lyrics"
                value={formData.lyrics}
                placeholder="Lyrics"
                className="appearance-none block placeholder:text-gray-700 w-full bg-black border border-white  text-white   py-3 px-4 mb-3 leading-tight focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-between w-full px-3">
              <button
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="button"
                onClick={onClickSubmit}
              >
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-indigo-400">Please Connect Your Wallet First</h1>
        </div>
      )}
    </>
  );
};

export default Minter;
