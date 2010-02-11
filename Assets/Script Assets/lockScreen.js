
var locked = true;
var lastclicked = false;


function Update () {
	if(Input.GetKey("p") && !lastclicked){
		locked = !locked;
		lastclicked = true;
	}
	if(!Input.GetKey("p")){
		lastclicked = false;
	}
	
	Screen.lockCursor =  locked;
	
}

function OnGUI(){
	var RectWidth = 100;
	var RectHeight = 90;
	var RectY = Screen.height/2 - RectHeight/2;
	var RectX = Screen.width/2 - RectWidth/2;
	if(!locked){
		// Make a background box
		GUI.Box (Rect (RectX,RectY,100,90), "Pause Menu");

		// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
		if (GUI.Button (Rect (RectX+10,RectY+30,RectWidth-20,20), "Reload")) {
			Application.LoadLevel (Application.loadedLevel);
		}

		// Make the second button.
		if (GUI.Button (Rect (RectX+10,RectY+60,RectWidth-20,20), "Level Select")) {
			Application.LoadLevel ("confined");
		}
	}	
}