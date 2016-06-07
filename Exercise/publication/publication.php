<?php

echo "
<html>
<head>
	<title>Welcome page</title>
	<link rel='stylesheet' type='text/css' href='publication.css' />
</head>
<body>
";

require_once 'mysql.php';
$dbServer = mysql_connect($dbHost, $dbUser, $dbPassword);
if (!$dbServer)
	die("Cannot connect to MySQL: ".mysql_error());
	
mysql_select_db('publication', $dbServer) 
	or die("Cannot select databse: ".mysql_error());

if (isset($_POST['action'])) {
	$formAction = $_POST['action'];
	echo "action = $formAction<br>";
	
	if (($formAction == 'add') && isset($_POST[title]) && isset($_POST[isbn]) && isset($_POST[author])) {
		$formTitle = $_POST['title'];
		$formIsbn = $_POST['isbn'];
		$formAuthor = $_POST['author'];
		echo "$formTitle, $formIsbn, $formAuthor<br>";
		
		$queryAuthor = "select authorId from authors where authorName='$formAuthor'";
		$result = mysql_query($queryAuthor, $dbServer);
		if ($result) {
			if (mysql_num_rows($result)==0) {
				$queryAuthor = "insert into authors values (NULL, '$formAuthor')";
				$result = mysql_query($queryAuthor, $dbServer);
				$authorId = mysql_insert_id();
			} else {
				$authorId = mysql_result($result, 0, 'authorId');
			}
			echo "AuthorId = $authorId<br>";
			$queryBook = "insert into books values ('$formIsbn', '$formTitle')";
			$result = mysql_query($queryBook, $dbServer);
			$queryBook = "insert into book_author values ('$formIsbn', '$authorId')";
			$result = mysql_query($queryBook, $dbServer);
		}
	} elseif (($formAction == 'delete') && isset($_POST[isbn])) {
		$formIsbn = $_POST['isbn'];
		echo "$formIsbn<br>";
		
		$queryAuthor = "delete from book_author where isbn='$formIsbn'";
		$result = mysql_query($queryAuthor, $dbServer);
		$queryBook = "delete from books where isbn='$formIsbn'";
		$result = mysql_query($queryBook, $dbServer);
	}
} 

echo "
<div id='divLeftPanel'>
Choose an action:<br>
	<ul>
		<li><a href='#' id='navAddBook'>Add a book</a></li>
		<li><a href='#' id='navBrowseBook'>Browse books</a></li>
		<li><a href='#' id='navDeleteBook'>Delete a book</a></li>
	</ul>
</div>
";

echo "<div id='divContext'>";

echo "
<div id='divAdd'>
	<form id='formAdd' method='post' action='publication.php'>
		<input type='hidden' name='action' value='add' />
		<label>Book Title: </label>
		<input type='text' name='title' /><br/>
		<label>ISBN no.</label>
		<input type='text' name='isbn' /><br/>
		<label>Author: </label>
		<input type='text' name='author' /><br/>
		<input type='submit' value='Add Record' />
	</form>
</div>
";

$queryBrowser = "select title, isbn, authorName from books natural join book_author natural join authors order by title;";
$result = mysql_query($queryBrowser, $dbServer);
if (!$result) 
	die("Database access failed: ".mysql_error());

echo "<div id='divBrowse'>
			<table id='tableBrowse'>";
$rows = mysql_num_rows($result);

if ($rows==0) {
	echo "<tr>No record found</tr>";
} else {
	echo "<tr><th>Book Title</th><th>ISBN</th><th>Author</th><th></th></tr>";
	for ($i=0; $i<$rows; ++$i) {
		$row = mysql_fetch_row($result);
		echo "<tr>
						<td>".$row[0]."</td>
						<td>".$row[1]."</td>
						<td>".$row[2]."</td>
						<td>
							<form method='post' action='publication.php'>
								<input type='hidden' name='action' value='delete' />
								<input type='hidden' name='isbn' value='$row[1]' />
								<input type='submit' value='Delete' />
							</form>
						</td>
					</tr>";
	}
}

echo "</table>
		  </div>";

?>

</body>
</html>
