<button
  onClick={async () => {
    const { addDoc, collection } = await import("firebase/firestore");
    await addDoc(collection(db, "test"), {
      ok: true,
      time: Date.now(),
    });
    alert("WRITE WORKING");
  }}
>
  TEST WRITE
</button>
