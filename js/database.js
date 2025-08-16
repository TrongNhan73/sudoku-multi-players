const roomRef = db.ref('rooms');



  const fbGetRoomData = async(roomId) => {
    const snapshot = await roomRef.child(roomId).once('value');
    if (snapshot.exists()) {
      return snapshot.val();  
    }
    return null;
  }


  const fbCreateRoom = async(roomId, roomData) => {
    try {
      await roomRef.child(roomId).set(roomData);
      return true;
    } catch (error) {
      console.error("Error creating room:", error);
      return false;
    }
  }

  const fbUpdateRoom = async(roomId, roomData) => {
    try {
      await roomRef.child(roomId).update(roomData);
      return true;
    } catch (error) {
      console.error("Error updating room:", error);
      return false;
    }
  }
  const fbListenToRoomChanges = (roomId, callback) => {
    const roomRef = db.ref(`rooms/${roomId}`);
    roomRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    });
  }

  const fbDeleteRoom = async(roomId) => {
    try {
      await roomRef.child(roomId).remove();
      return true;
    } catch (error) {
      console.error("Error deleting room:", error);
      return false;
    }
  }