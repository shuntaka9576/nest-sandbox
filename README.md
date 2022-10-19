# nest-sandbox

## 開発環境構築

### 初回のみ

`./_tools/mysql/conf.d/mysql.cnf`の`autocommit`設定を削除

```diff
- autocommit=0
```

```bash
docker compose up
```

autocommitを戻して、再度サービス起動
```diff
+ autocommit=0
```

```bash
docker compose up -d
```

### 初回以降

```bash
docker compose up -d
```

### 初期化

```bash
docker compose down --rmi all --volumes --remove-orphans
```
