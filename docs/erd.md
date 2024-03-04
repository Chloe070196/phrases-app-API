# ERD

## entities

### needed for mvp

- User
- Phrase (as obtained from STANDS4 Phrases API)
- UserPhrase (extends Phrase)
- UserText

### additional features

- LearningSession
- PracticeScore
- IncorrectAlternatives (instead of just showing random unrelated phrases as alternative MCQ choices, have an array of these for each phrase that are determined in advance, and that aim to make the user think)

 <!-- TODO: check / update -->

 ```mermaid

erDiagram

 PHRASE ||--o{ USERPHRASE : can_have
 USER ||--o{ USERPHRASE : can_have
 USER ||--o{ TEXT : can_have

 USER {
    integer         id              PK
    string          email           
    string          username
    string          password
    array           userPhrases   
    array           texts
    datetime        createdAt
    datetime        updatedAt 
 }
 PHRASE {
    integer         id              PK
    string          title
    string          content
    string          meaning
    string          example
    array           userPhrases 
    datetime        createdAt
    datetime        updatedAt 
 }
 USERPHRASE {
    integer     id              PK
    Phrase      phrase
    phraseId    id              FK
    User        user            
    userId      id              FK
    string      status
    int         timesAttempted
    int         timesSeen
    int         timesUsed
    datetime    createdAt
    datetime    updatedAt 
 }
 TEXT {
    integer     id              PK
    string      content 
    User        user            
    userId      id              FK   
    string      textType    
    array       phrasesUsed        
    datetime    createdAt
    datetime    updatedAt 
 }

 ```
