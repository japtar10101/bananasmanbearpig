var spring = 300.0;
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var springMaxDistance = 0.5;
var detectionDistance = 30;
var attractionDistance = 3;
var repulsionDistance = 10;

private var springJoint : SpringJoint;

function Update ()
{
	// We need to actually hit an object
	var mainCamera = FindCamera();
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0)),  hit, detectionDistance))
		return;
	
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;
	
	// Turn the object red
	hit.rigidbody.renderer.material.color.r = 1.0; 
	hit.rigidbody.renderer.material.color.g = 0.0; 
	hit.rigidbody.renderer.material.color.b = 0.0;
	
	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown(0)) return;	
	if (!springJoint)
	{
		var go = new GameObject("Rigidbody dragger");
		body = go.AddComponent ("Rigidbody");
		springJoint = go.AddComponent ("SpringJoint");
		body.isKinematic = true;
	}
	
	springJoint.transform.position = hit.point;
	springJoint.anchor = Vector3.zero;
	
	springJoint.spring = spring;
	springJoint.damper = damper;
	springJoint.maxDistance = springMaxDistance;
	springJoint.connectedBody = hit.rigidbody;
	
	StartCoroutine ("Gravity");
}

function Gravity ()
{
	var oldDrag = springJoint.connectedBody.drag;
	var oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	var mainCamera = FindCamera();
	var ray : Ray;
	
	//Loop while holding he left button
	while (Input.GetMouseButton (0))
	{
		ray = mainCamera.ScreenPointToRay (Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0));
		springJoint.transform.position = ray.GetPoint(attractionDistance);
		yield;
	}
	if (springJoint.connectedBody)
	{
		// repel the object once we stop holding the mouse button
		ray = mainCamera.ScreenPointToRay (Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0));
		springJoint.transform.position = ray.GetPoint(repulsionDistance);
		yield;
		
		// remove the joints
		springJoint.connectedBody.drag = oldDrag;
		springJoint.connectedBody.angularDrag = oldAngularDrag;
		springJoint.connectedBody = null;
	}
}

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}