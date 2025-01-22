import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBbJDnmlNa2wObKWmQ6MLuXQ5KWbp0FDEA",
  authDomain: "insan-cemerlang-8011b.firebaseapp.com",
  projectId: "insan-cemerlang-8011b",
  storageBucket: "insan-cemerlang-8011b.firebasestorage.app",
  messagingSenderId: "642542638808",
  appId: "1:642542638808:web:8dae3c0d85e3be8c5c29ad"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarStokOpname() {
  const refDokumen = collection(db, "stokopname");
  const kueri = query(refDokumen, orderBy("namabarang"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      namabarang: dok.data().namabarang,
      jumlahbarang: dok.data().jumlahbarang,
      sisabarang: dok.data().sisabarang
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahStokOpname(namabarang, jumlahbarang, sisabarang) {
  try {
    const dokRef = await addDoc(collection(db, 'stokopname'), {
      namabarang:  namabarang,
      jumlahbarang: jumlahbarang,
      sisabarang: sisabarang
    });
    console.log('Berhasil menambah stokopname' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah stokopname' + e);
  }
}

export async function hapusstokopname(docId) {
  await deleteDoc(doc(db, "stokopname", docId));
}

export async function ubahstokopname(docId, namabarang, jumlahbarang, sisabarang) {
  await updateDoc(doc(db, "stokopname", docId),{
    namabarang: namabarang,
    jumlahbarang: jumlahbarang,
    sisabarang: sisabarang
  });
}

export async function ambilStokOpname(docId) {
  const docRef = await doc(db, "stokopname", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}