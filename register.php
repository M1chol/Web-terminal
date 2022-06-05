<?php
$mysqli = new mysqli("sql105.epizy.com", "epiz_31804874", "KLrCNkBsWjkd", "epiz_31804874_stronka");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$name = $_GET['nm'];
$pass = $_GET['ps'];
$styl = $_GET['st'];

$sql = "INSERT INTO `users`(`id`, `username`, `password`, `style`) VALUES (0, ?, ?, ?)";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("sss", $name, $pass, $styl);
$stmt->execute();

echo $name;
echo ', ';
echo $pass;
echo ', ';
echo $styl;

?>