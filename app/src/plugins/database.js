import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

import firebase from 'firebase/app'
import 'firebase/firestore'

export default firebase
  .initializeApp({ projectId: 'send-foodz-1a677' })
  .firestore()
