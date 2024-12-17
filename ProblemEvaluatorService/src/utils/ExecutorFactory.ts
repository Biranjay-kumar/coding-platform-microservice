
import CppExecutor from '../containers/CppExecutor';
import JavaExecutor from '../containers/JavaExecutor';
import PythonExecutor from '../containers/PythonExecutor';
import CodeExecutorStrategy from './../containers/CodeExecutorStrategy';

export default function createFactory(codeLanguage:string):CodeExecutorStrategy|null{

 if(codeLanguage.toLowerCase()==="java"){
  return new JavaExecutor()
 }
 else if(codeLanguage.toLowerCase()==="cpp"){
  return new CppExecutor();
 }
 else{
  return new PythonExecutor();
 }


}