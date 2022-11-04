import React, { useState } from "react";
import CommunityContext from "./CommunityContext";
import { useContext } from "react";
import Popup from "./Popup";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import RedirectContext from "./RedirectContext";

function CommunityFormModal() {
  const { show, setShow } = useContext(CommunityContext);
  const { setRedirect } = useContext(RedirectContext);

  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');

  const create = () => {
    const data = {name, slogan, avatar, cover};
    axios.post("/communities", data, {withCredentials: true})
    // axios.post("https://real-reddit-server.onrender.com/communities", data, {withCredentials: true})
      .then(() => {
        setRedirect('/r/'+name);
        setShow(false);
      })
  }

  if (!show) {
    return null;
  }

  return (
    <Popup open={show} onClickOut={() => setShow(false)}>
      <h1 className={"text-2xl mb-5"}>Create a new subreddit</h1>
      <Input value={name} onChange={ e => setName(e.target.value)} placeholder={'Name'} className="w-full mb-2" />
      <Input value={slogan} onChange={ e => setSlogan(e.target.value)} placeholder={'Slogan'} className="w-full mb-2" />
      <Input value={avatar} onChange={ e => setAvatar(e.target.value)} placeholder={'Avatar imagee url'} className="w-full mb-2" />
      <Input value={cover} onChange={ e => setCover(e.target.value)} placeholder={'Cover image url'} className="w-full mb-2" />
      <div className="text-right">
        <Button onClick={() => setShow(false)} 
          outline className={"px-4 py-2 mr-3"}>Cancel</Button>
        <Button onClick={() => create()} className={'px-4 py-2'}>Create your subreddit!</Button>
      </div>
    </Popup>
  );
}

export default CommunityFormModal;
