const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// get posts
exports.getPosts = functions.https.onRequest((req, res) => {
    admin.firestore().collection('posts').get()
        .then(data => {
            let posts = [];
            data.forEach(doc => {
                posts.push(doc.data());
            });
            return res.json(posts);
        })
        .catch(err => console.error(err));
})

//create posts
exports.createPosts = functions.https.onRequest((req, res) => {
    if(req.method !== 'POST') {
        return res.status(400).json({error: 'method not allowed'});
    }
    const newPost = {
        title: req.body.title,
        body: req.body.body,
        timeStamp: admin.firestore.Timestamp.fromDate(new Date())
    };
    admin.firestore()
        .collection('posts')
        .add(newPost)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        })
});

//get users
exports.getUsers = functions.https.onRequest((req, res) => {
    admin.firestore().collection('users').get()
        .then(data => {
            let users = [];
            data.forEach(doc => {
                users.push(doc.data());
            });
            return res.json(users);
        })
        .catch(err => console.error(err));
})