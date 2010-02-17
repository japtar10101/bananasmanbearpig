var bridge : GameObject;
private var targetTriggered : boolean= false;
private var xTranslate = 57;
private var translateVector = new Vector3(-1, 0, 0);

function OnCollisionEnter () {
	if(!targetTriggered) {
		//Somehow, move the bridge.
		targetTriggered = true;
	}
}

function Update () {
	if(targetTriggered && xTranslate > 0) {
		bridge.transform.Translate(translateVector);
		xTranslate -= 1;
	}
}