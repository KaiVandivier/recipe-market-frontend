function hasPermissions(user, acceptablePermissions) {
  return user.permissions.some(permission =>
    acceptablePermissions.includes(permission)
  );
}

function ownsItem(user, item) {
  return user.id === item.user.id;
}

export { hasPermissions, ownsItem };
