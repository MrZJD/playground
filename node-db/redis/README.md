## redis

1. 安装redis, 并配置环境变量

**常用CMD**

```bash
redis-server redis.window.conf # 创建redis服务

redis-cli -h 127.0.0.1 -p 6379 # 访问redis服务
redis-cli --raw # 防止中文乱码
```

**常用配置**

```bash
# redis.window.conf / redis.conf # 配置文件

CONFIG GET * # 获取所有配置项

CONFIG SET loglevel "notice" # 设置配置项
```

### redis知识

> 基础结构key-value key最大内存为512MB

#### 数据类型

1. String

> String 可以包含任何数据(jpg图片 序列化的对象) Max-Size: 512MB

```bash
SET name "runoob"
GET name
```

2. hash

> key-value集合 key-string的映射表  Max-Size: 2^32-1 个键值对

```bash
HMSET myhash field1 "Hello" field2 "World"
HGET myhash field1
HGET myhash field2
```

3. list

> 简单的字符串列表 可以向前向后添加 Max-Size: 2^32-1 个元素

```bash
lpush runoob redis
lpush runoob mongodb
lpush runoob rabitmq
lrange runoob 0 10
```

4. set

> 字符串的无序集合(唯一)，添加删除查找都是通过hash表 O(1) Max-Size: 2^32-1 个元素

```bash
sadd runoob redis
sadd runoob mongodb
sadd runoob rabitmq # 1
sadd runoob rabitmq # 0

smembers runoob
```

5. zset (sorted set)

> 字符串的有序集合，每个元素通过一个double类型进行由大到小的排序

```bash
zadd runoob 0 redis
zadd runoob 0 mongodb
zadd runoob 1 rabitmq

ZRANGEBYSCORE runoob 0 1000
```

#### 常用命令

1. 键命令

```bash
DEL key # 删除
DUMP key # 返回序列化值
EXISTS key # 检查key是否存在
RENAME key newkey # rename
RENAMENX key newkey # rename when newkey doesn't exist
TYPE key # get type

EXPIRE key seconds # 设置过期时间s # PEXPIRE key ms
EXPIREAT key timestamp # 设置过期时间 unix timestamp # PEXPIREAT key milliseconds-timestamp
PERSIST key # 移除过期限时
TTL key # 返回剩余过期时间 s # PTTL key # ms

KEYS pattern # 筛选符合pattern的key
RANDOMKEY # 随机返回一个key
```

2. String相关

```bash
SET key value
GET key
STRLEN key # len
GETRANGE key start end # 子字符串
APPEND key value # 追加
GETSET key value # 设置新值 返回旧值
GETBIT key offset # get bit
SETBIT key offset value # set by bit

SETEX key seconds value # 设置过期与值 # PSETEX key milliseconds value # ms
SETNX key value # key 不存在时 才设置key
SETRANGE key offset value # 偏移写入

MGET key1 [key2...]
MSET key value [key value ...]
MSETNX key value [key value ...] 

INCR key # 存储值+1
INCRBY key increment # +n
INCRBYFLOAT key increment # +float
DECR key # -1
DECRBY key decrement # -n
```

3. hash相关

```bash
HSET key field value
HMSET key field1 value1 [field2 value2]
HSETNX key field value

HDEL key field [field2...]
HEXISTS key field
HGET key field
HGETALL key # 获取所有字段和值
HKEYS key # 获取所有字段
HVALS key # 获取所有值
HLEN key
HMGET key field1 [field2]

HINCRBY key field increment # +int
HINCRBYFLOAT key field increment # +float

HSCAN key cursor [MATCH pattern] [COUNT count] # 迭代键值对
```

4. list相关

```bash
LINDEX key index # 根据索引获取元素
LINSERT key BEFORE|AFTER pivot value # 插入元素
LLEN key
LPOP key # 移出并获取列表的第一个元素
LPUSH key value1 [value2]  # 插入到列表头部
LPUSHX key value #  插入到已存在的列表头部
LRANGE key start stop # 获取指定范围
LREM key count value # remove
LSET key index value # 通过索引设置值
LTRIM key start stop # 只保留区间内的元素
RPOP key # 移除最后一个元素
RPOPLPUSH source destination # 移除列表的最后一个元素，并将该元素添加到另一个列表
RPUSH key value1 [value2] # 列表尾部
RPUSHX key value # 为已存在的列表添加值

# 添加timeout等待
BLPOP key1 [key2 ] timeout # pop并获取第一个元素，没有元素则会等待
BRPOP key1 [key2 ] timeout # 移除最后一个
BRPOPLPUSH source destination timeout # 从列表尾部弹出一个值 push到另一个列表
```

5. Set相关

```bash
SADD key member1 [member2] # 添加成员
SMEMBERS key # 返回所有成员
SCARD key # 获取成员数量
SISMEMBER key member # 是否有成员
SREM key member1 [member2] # 移除一个或多个成员

SMOVE source destination member # 将 member 元素从 source 集合移动到 destination 集合
SPOP key # 移除并返回集合中的一个随机成员
SRANDMEMBER key [count] # 一个多个随机成员

SDIFF key1 [key2] # 差集
SDIFFSTORE destination key1 [key2] # 存储差集
SINTER key1 [key2] # 交集
SINTERSTORE destination key1 [key2] # 存储交集
SUNION key1 [key2] # 并集
SUNIONSTORE destination key1 [key2] # 存储并集
SSCAN key cursor [MATCH pattern] [COUNT count] # 迭代集合中的元素
```

6. ZSet相关

```bash
ZADD key score1 member1 [score2 member2] # add | update
ZCARD key # 获取成员数
ZCOUNT key min max # 获取指定分数区间的成员数
ZLEXCOUNT key min max # ???字典区间
ZRANGE key start stop [WITHSCORES] # 索引区间内的成员
ZRANGEBYLEX key min max [LIMIT offset count] # 字典区间内的成员
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] # 分数区间内的成员
ZREVRANGE key start stop [WITHSCORES] # 指定区间内的成员，通过索引，分数从高到底
ZREVRANGEBYSCORE key max min [WITHSCORES] # 指定区间内的成员，通过分数，分数从高到底
ZREVRANK key member # 指定成员的排名(按分数值递减(从大到小)排序)
ZSCORE key member # 指定成员的分数值

ZRANK key member # 指定成员的索引
ZREM key member [member ...]  # remove
ZREMRANGEBYLEX key min max # remove by 字典
ZREMRANGEBYRANK key start stop  # remove by 索引
ZREMRANGEBYSCORE key min max  # remove by 分数


ZINCRBY key increment member # 指定成员的分数+n

ZINTERSTORE destination numkeys key [key ...] # 存储交集
ZUNIONSTORE destination numkeys key [key ...] # 存储并集

ZSCAN key cursor [MATCH pattern] [COUNT count] # 迭代集合中的元素
```

#### 发布订阅

```bash
SUBSCRIBE redisChat # 订阅
UNSUBSCRIBE [channel [channel ...]] # 取消订阅
PUBLISH redisChat "Redis is a great caching technique" # 发布

PUBSUB subcommand [argument [argument ...]] # 查看订阅发布系统的状态

# by pattern
PSUBSCRIBE pattern [pattern ...] 
PUNSUBSCRIBE [pattern [pattern ...]] 
```

#### 事务

> redis事务并非原子性，中间某条指令失败不会回滚，也不影响后续指令的执行。redis事务只是一个大包的批量执行脚本。

```bash
MULTI # 事务开始
# ... # 指令
DISCARD # 取消事务
EXEC # 执行事务

WATCH key [key ...] # 在事务执行前 watch key, 如果这些key被改动, 则事务将被打断
UNWATCH # 取消 watch
```

#### 数据备份与恢复

```bash
SAVE # 备份
BGSAVE # 后台执行备份
CONFIG GET dir # 恢复数据只需将备份文件移入redis安装目录
```

#### 安全

```bash
CONFIG get requirepass

CONFIG set requirepass "runoob"

AUTH "runoob"
```

#### 性能测试

```bash
redis-benchmark [option] [option value]

redis-benchmark -h 127.0.0.1 -p 6379 -t set,lpush -n 10000 -q
```
