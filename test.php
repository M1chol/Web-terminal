<?php
$mysqli = new mysqli("sql105.epizy.com", "epiz_31804874", "KLrCNkBsWjkd", "epiz_31804874_stronka");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT username, password, style
FROM users WHERE username = ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user, $pass, $styl);
$stmt->fetch();
$stmt->close();

echo $user;
echo ' ';
echo $pass;
echo ' ';
echo $styl;
?>