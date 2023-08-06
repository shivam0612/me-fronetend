import React, { useRef, useState, useEffect, forwardRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

firebase.initializeApp({
    apiKey: "AIzaSyAJpWb0ENyZLywhdfYTQLgsU7kGMIkolSA",
    authDomain: "magicentertainment-1.firebaseapp.com",
    projectId: "magicentertainment-1",
    storageBucket: "magicentertainment-1.appspot.com",
    messagingSenderId: "226539778652",
    appId: "1:226539778652:web:38e8172b060d477fc62c99",
    measurementId: "G-SNE59QTF6J"
});

const firestore = firebase.firestore();
const analytics = firebase.analytics();
const auth = getAuth();

function ChatHome2() {
  const dummy = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [showGlobalChat, setShowGlobalChat] = useState(false); // Step 1: Toggle state for ChatHome2

  const messagesRef = firestore.collection('messages-preference');
  const query = userInfo && userInfo.preference
    ? messagesRef
        .where('preference', '==', userInfo.preference)
        .orderBy('createdAt')
        .limit(25)
    : messagesRef; // Default to the messagesRef if userInfo is not available or doesn't have "preference" field


  const [messages, setMessages] = useState([]); // Store the messages in component state
  const [formValue, setFormValue] = useState('');
  const [userName, setUserName] = useState('');

  const handleToggle = () => {
    setShowGlobalChat((prev) => !prev);
  };

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log('Anonymous user signed in successfully.');
      })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
      });

    if (userInfo) {
      setUserName(userInfo.name);
    }
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = query.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, [query]);

  const lastMessageRef = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, formValue]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { _id, preference } = userInfo;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: _id,
      name: userName,
      preference: preference,
      id: uuidv4(), // Generate a unique ID for each message
    });

    setFormValue('');
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <>
      <main className="shadow chat-main">
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              userInfo={userInfo}
              ref={msg === messages[messages.length - 1] ? lastMessageRef : null}
            />
          ))}
        <span ref={dummy}></span>
      </main>
      <Form onSubmit={sendMessage} className='chatform'>
        <Row>
          <Col xs={9}>
            <Form.Control
              value={formValue}
              className='chatinput'
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice"
            />
          </Col>
          <Col xs={3}>
            <Button className='chatbutton' type="submit" disabled={!formValue}>
              send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

const ChatMessage = forwardRef((props, ref) => {
  const { text, uid, name } = props.message;
  const isSentByCurrentUser = uid === props.userInfo._id;
  const messageClass = isSentByCurrentUser ? 'sent' : 'received';

  return (
    <div ref={ref} className={`body-tag cmessage ${messageClass}`}>
      <p>{name} : {text}</p>
    </div>
  );
});

export default ChatHome2;
