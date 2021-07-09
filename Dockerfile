FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

EXPOSE 5001

# Copy csproj and restore as distinct layers
COPY backend/*.csproj ./

RUN dotnet restore

# Copy everything else and build
COPY ./backend/ ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "backend.dll", "--urls=http://0.0.0.0:5000"]
