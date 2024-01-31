---
title: Mermaidサンプル（フローチャート）
cratedAt: '2024-01-31T21:04:40+09:00'
updatedAt: '2024-01-31T21:04:40+09:00'
---

```txt
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

```mermaid
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```
