FRONTEND_DIR="client"
BACKEND_DIR="backend"

# check if the argument is `debug` or `release`
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [debug|release]"
    exit 1
fi

if [ "$1" != "debug" ] && [ "$1" != "release" ]; then
    echo "Usage: $0 [debug|release]"
    exit 1
fi

mkdir -p build
cp -r $FRONTEND_DIR/ build/
cp -r $BACKEND_DIR/ build/

