#!/bin/bash
set -e

# --- 配置区域 ---
APP_NAME="hcsw-semporna-meili-resort-website"
REGISTRY="dch.hcsw.work:5000"
NAMESPACE="semporna-meili-resort"
IMAGE_NAME="website"
BRANCH="master"

# 组合完整镜像路径
FULL_IMAGE_PATH="${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}"

# --- 样式定义 ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- 辅助函数 ---
log_info() {
    echo -e "${GREEN}[INFO] $(date '+%H:%M:%S') $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}[WARN] $(date '+%H:%M:%S') $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $(date '+%H:%M:%S') $1${NC}"
    # 如果有错误，恢复现场
    if [ "$STASHED" == "1" ]; then
        echo -e "${YELLOW}[WARN] 正在恢复之前暂存的本地代码...${NC}"
        git stash pop
    fi
}

# 错误处理
# trap 'log_error "脚本执行失败，请检查上方报错信息。"' ERR

# --- 主流程 ---

start_time=$(date +%s)
log_info "=== 开始构建流程: $APP_NAME ==="

# 1. 环境检查
if ! docker info > /dev/null 2>&1; then
    log_error "Docker 服务未运行，请先启动 Docker。"
    exit 1
fi

# 2. 代码更新
log_info "检查代码状态..."
if [ -n "$(git status --porcelain)" ]; then
    log_warn "检测到本地有未提交的代码，正在自动暂存 (Stash)..."
    git stash
    STASHED=1
fi

log_info "切换到分支: $BRANCH 并拉取最新代码..."
git switch $BRANCH
git pull

# 生成版本号: 日期-CommitHash (例如: 20231027-a1b2c3d)
VERSION_TAG="$(date +%Y%m%d)-$(git rev-parse --short HEAD)"
log_info "生成构建版本号: $VERSION_TAG"

# 3. 构建镜像
log_info "开始构建 Docker 镜像..."
export DOCKER_BUILDKIT=1

# --- 数据库环境变量 (生产) ---
# export DATABASE_URL="mysql://hcsw-salary:kkFtvrj4p=!CsYs-u2M7@mysql:3306/hcsw_salary"

# 同时打上 latest 和 版本号 tag
# docker build --build-arg DATABASE_URL="$DATABASE_URL" -t "$FULL_IMAGE_PATH:latest" -t "$FULL_IMAGE_PATH:$VERSION_TAG" .

docker build -t "$FULL_IMAGE_PATH:latest" -t "$FULL_IMAGE_PATH:$VERSION_TAG" .

# 4. 推送镜像
log_info "正在推送到镜像仓库..."

log_info "Pushing: $FULL_IMAGE_PATH:$VERSION_TAG"
docker push "$FULL_IMAGE_PATH:$VERSION_TAG"

log_info "Pushing: $FULL_IMAGE_PATH:latest"
docker push "$FULL_IMAGE_PATH:latest"

# 5. 清理与收尾
if [ "$STASHED" == "1" ]; then
    log_warn "恢复之前暂存的本地代码..."
    git stash pop
fi

end_time=$(date +%s)
duration=$((end_time - start_time))

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${GREEN}   ✅  构建部署成功!${NC}"
echo -e "${GREEN}   ⏱️   总耗时: ${duration} 秒${NC}"
echo -e "${GREEN}   🏷️   镜像版本: $VERSION_TAG${NC}"
echo -e "${GREEN}=======================================${NC}\n"
