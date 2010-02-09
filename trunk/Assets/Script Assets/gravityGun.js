var spring = 300.0;
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var springMaxDistance = 0.5;
var detectionDistance = 30;
var attractionDistance = 3;

private var springJoint : SpringJoint;

function Update ()
{
	// Make sure the user pressed the mouse down

	var mainCamera = FindCamera();
		
	// We need to actually hit an object
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
	
	StartCoroutine ("DragObject", attractionDistance);
}

function DragObject ()
{
	var oldDrag = springJoint.connectedBody.drag;
	var oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	var mainCamera = FindCamera();
	while (Input.GetMouseButton (0))
	{
		var ray = mainCamera.ScreenPointToRay (Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0));
		springJoint.transform.position = ray.GetPoint(attractionDistance);
		yield;
	}
	if (springJoint.connectedBody)
	{
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