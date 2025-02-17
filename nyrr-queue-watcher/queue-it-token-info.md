https://github.com/queueit/QueueToken.V1.JavaScript

Token Header
{
  "typ": "QT1",
  "enc": "AES256",
  "iss": 1526464517,
  "exp": 1526524517,
  "ti": "159aba3e-55e1-4f54-b6ee-e5b943d7e885",
  "c": "ticketania",
  "e": "demoevent",
  "ip": "75.86.129.4",
  "xff": "45.67.2.4,34.56.3.2"
}
typ: The type of the token. Value must be "QT1". Required.
enc: Payload encryption algorithm. Value must be "AES256". Required.
iss: NumericDate of when token was issued. Required.
exp: NumericDate of when token expires. Optional.
ti: Unique Token ID (e.g. uuid). Used to uniquely identify tokens and restrict replay attacks. Required.
c: The Customer ID of the issuer. Token will only be valid on events on this account. Required.
e: The Event ID. If provided, token will only be valid on this event. Optional.
ip: The IP address of user the token is issued for. If provided, the IP address in the token is validated against the client IP before issuing a new Queue id. Optional.
xff: The X-Forwarded-For header of the request when the token is issued. Only used for logging. Optional.


