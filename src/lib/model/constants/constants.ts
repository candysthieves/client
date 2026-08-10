export const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/

export const USERNAME_PATTERN_MESSAGE = 'username must match /^[A-Za-z0-9_-]+$/ regular expression'

export const PASSWORD_PATTERN_MESSAGE = `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ `
