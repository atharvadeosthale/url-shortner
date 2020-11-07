import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useState } from "react";
import "./Shortner.css";
import { v4 as uuid } from "uuid";
import axios from "./axios";

function Shortner() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");

  const makeUrl = async () => {
    try {
      if (link == "") {
        return openModal(
          "Please input a link! You can leave code empty if you want."
        );
      }
      var finalCode = "";
      if (code == "") {
        finalCode = uuid();
      } else {
        finalCode = code;
      }
      const res = await axios.post("/api/v1/create", {
        link,
        code: finalCode,
      });
      openModal(
        "URL shortened successfully! Here's the link - " + res.data.shortened
      );
    } catch (err) {
      console.log(err);
      return openModal(err.response.data.message);
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="shortner">
      <div className="shortner__inputContainer">
        <input
          type="text"
          placeholder="Paste link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <IconButton onClick={makeUrl}>
          <Send />
        </IconButton>
      </div>

      <div className="shortner__inputContainer" style={{ marginTop: 30 }}>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <Dialog
        open={showModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"URL Shortner"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setShowModal(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Shortner;
