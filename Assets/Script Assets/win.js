private var win : boolean = false;
private var controller : CharacterController;

function OnTriggerEnter (other : Collider) {
	// Grab the controller's location
	if(other.GetComponent(gravityGun)) {
		win = true;
		var lockedScreen = GetComponent(lockScreen);
		lockedScreen.locked = false;
		//Screen.lockCursor =  false;
	}
}

function OnGUI() {
	if(win) {
		var RectWidth = Screen.width/2;
		var RectHeight = Screen.height/2;
		var ButtonWidth = RectWidth - 20;
		var ButtonHeight = RectHeight - 40;
		var RectY = Screen.height/2 - RectHeight/2;
		var RectX = Screen.width/2 - RectWidth/2;
	
		// Make a background box
		GUI.Box (Rect (RectX,RectY,RectWidth,RectHeight), "Congratulations!");
		
		// Make the OK button.
		if (GUI.Button (Rect (RectX+10,RectY+30,ButtonWidth,ButtonHeight), "OK")) {
			Application.LoadLevel ("confined");
		}
	}
}

@script RequireComponent(CharacterController)