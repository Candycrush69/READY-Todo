<?php
  require '../php/db.php';

  $link = mysqli_connect($host, $user, $password, $db) or die("Ошибка " . mysqli_error($link));

  if ($_SERVER['REQUEST_METHOD'] === 'GET') 
  {
    $sql = "SELECT * FROM todo_list;";
    $result = $link->query($sql);

    $todos = array();
    while($row = $result->fetch_assoc()) {
      $todo[] = $row;
    }
    echo json_encode($todo);
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'POST') 
  {
    $_POST = json_decode(file_get_contents('php://input'), true);  
    $todo = $_POST['todo'];
    
    $sql = "INSERT INTO todo_list (text) VALUES('$todo')";
    $result = $link->query($sql);
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'PUT') 
  {
    $_PUT = json_decode(file_get_contents('php://input'), true);  
    $id = $_PUT['id'];
    $boolean = $_PUT['checked'] ? 1 : 0;
    $text = $_PUT['text'];
    $sql = "UPDATE `todo_list` SET `checked`='$boolean', `text`='$text' WHERE id = $id";
    var_dump($sql);
    $result = $link->query($sql);
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') 
  {
    $_POST = json_decode(file_get_contents('php://input'), true);  
    $id = $_POST['id'];
    $sql = "DELETE FROM `todo_list` WHERE id=$id";
    $result = $link->query($sql);
  }
  
?>