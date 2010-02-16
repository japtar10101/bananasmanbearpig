static var musicloaded;


function Awake () {
 if(musicloaded != null){
	Destroy(gameObject);
 }
 else{
	musicloaded = true;
	DontDestroyOnLoad (this); 
 }
}