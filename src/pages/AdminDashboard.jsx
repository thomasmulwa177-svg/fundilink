<button
  onClick={async () => {
    try {
      const { addDoc, collection } = await import("firebase/firestore");
      await addDoc(collection(db, "test"), {
        time: Date.now(),
      });
      alert("WRITE SUCCESS");
    } catch (e) {
      alert("FAILED: " + e.message);
      console.log(e);
    }
  }}
>
  TEST WRITE
</button>
