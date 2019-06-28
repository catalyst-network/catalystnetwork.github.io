<?php
	if(isset($_POST['news-email'])){
        $subject = "New newsletter subscription from: ";
        $email = $_POST['news-email'];
        $message = $_POST['news-email']." has requested to subscription initium's newsletter.";
        $msg = "subject: $subject, email: $email, message: $message";
        if(mail('info@catalystnet.org',$subject,$msg)){
            header('Location: index.php?newsdone');
        }else{
            header('Location: index.php?error');
        }   
        exit;
	}
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $subject = $_POST['subject'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];
        $msg = "name: $name, subject: $subject, phone: $phone, email: $email, message: $message";
        if(mail('info@catalystnet.org',$subject,$msg)){
            header('Location: index.php?done');
        }else{
            header('Location: index.php?error');
        }   
        exit;
    }
?>