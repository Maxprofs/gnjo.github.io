 /*
 usage:
 sys.key='xyz';//localStorage key
 sys.time=700;//save span; if changed, auto save.
 sys.load();
 //
 let cep=this.__.tagName
 sys.on('changed',(data)=>{ }) //data is all;
 sys.emit('change',{[cep]:data});
 */
;(function(root){
 var de=(function(root){
  var _={}; 
  /*original by underscore.js*/
  //line 1457
  _.now = Date.now || function() {
   return new Date().getTime();
  };
  //line 883
  _.debounce = function(func, wait, immediate) {
   var timeout, args, context, timestamp, result;

   var later = function() {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
     timeout = setTimeout(later, wait - last);
    } else {
     timeout = null;
     if (!immediate) {
      result = func.apply(context, args);
      if (!timeout) context = args = null;
     }
    }
   };

   return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
     result = func.apply(context, args);
     context = args = null;
    }

    return result;
   };
  };
  //root._ =_;
  return _.debounce
 })(this)
 ;//de
 var ls=(function(root){
  var ls={};
  if(localStorage){
   //var ls={};
   ls.setI=(k,v)=>{return localStorage.setItem(k,JSON.stringify(v))}
   ls.getI=(k)=>{return JSON.parse(localStorage.getItem(k)||null)}
   ls.delI=(k)=>{return localStorage.removeItem(k)}
   ls.keys=()=>{return Object.keys(localStorage)}
   //root.ls=ls;
   //return ls
  }
  return ls;
 })(this)
 ;//ls
 var is={}
 is.object = function(obj){var type = typeof obj;return type === 'function' || type === 'object' && !!obj}
 ;
 var sys= riot.observable();
 sys.emit=sys.trigger
 sys.data={};
 sys.time=700;
 sys.key='systemxyz'
 sys.save=()=>{ ls.setI(sys.key,sys.data); sys.emit('saved')}
 sys.savede=de(sys.save,sys.time)
 sys.load=()=>{ sys.data=ls.getI(sys.key)||{}; sys.emit('loaded') }
 sys.on('load',function(){ sys.load()})
 sys.on('save',function(){ sys.save()})
 sys.on('changed',function(){ sys.savede()})
 sys.on('change',function(d1,d2){
  if(d1&&d2) this.data[d1]=d2;
  if(is.object(d1)&&d1&&!d2) this.data=d1;
  this.emit('changed',this.data) 
 });
 root.sys=sys;
})(this);