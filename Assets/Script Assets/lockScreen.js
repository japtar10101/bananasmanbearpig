
private var locked = true;
private var showMenu = false;
private var lastclicked = false;


function Update () {
	if(Input.GetKey("p") && !lastclicked){
		locked = !locked;
		lastclicked = true;
		showMenu = !showMenu;
	}
	if(!Input.GetKey("p")){
		lastclicked = false;
	}
	
	Screen.lockCursor =  locked;
	
}

function OnGUI(){
	var RectWidth = Screen.width/2;
	var RectHeight = Screen.height/2;
	var buttonHeight = RectHeight / 3;
	var RectY = Screen.height/2 - RectHeight/2;
	var RectX = Screen.width/2 - RectWidth/2;
	if(showMenu){
		// Make a background box
		GUI.Box (Rect (RectX,RectY,RectWidth,RectHeight), "Pause Menu");

		// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
		if (GUI.Button (Rect (RectX+10,RectY+30,RectWidth-20,buttonHeight), "Reload")) {
			Application.LoadLevel (Application.loadedLevel);
		}

		// Make the second button.
		if (GUI.Button (Rect (RectX+10,RectY+buttonHeight + 60,RectWidth-20,buttonHeight), "Level Select")) {
			Application.LoadLevel ("confined");
		}
	}	
}