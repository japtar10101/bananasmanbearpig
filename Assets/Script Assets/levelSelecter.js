var levelNames : String[testing, gap, confined];
var title : String = "Select a level";
var groupWidth : int = 400;
var groupHeight : int = 500;

function OnGUI () {
	var shiftLeft : int = Screen.width / 2 - groupWidth / 2;
	var shiftUp : int = Screen.height / 2 - groupHeight / 2;

	// Make a group on the center of the screen
	GUI.BeginGroup (Rect (shiftLeft, shiftUp, groupWidth, groupHeight));
	// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.

	// We'll make a box so you can see where the group is on-screen.
	GUI.Box (Rect (0,0,100,100), title);
	GUI.Button (Rect (10,40,80,30), "Click me");

	// End the group we started above. This is very important to remember!
	GUI.EndGroup ();
}
