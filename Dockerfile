FROM mcr.microsoft.com/dotnet/core/sdk AS build-env
WORKDIR /app

EXPOSE 5001


RUN ls -la
RUN pwd

# Copy csproj and restore as distinct layers
COPY backend/*.csproj ./

RUN ls -la
RUN pwd

RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "backend.dll"]
